import { User } from 'src/users/user.entity';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailPassword, {
  APIInterface,
} from 'supertokens-node/recipe/emailpassword';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Session from 'supertokens-node/recipe/session';
import UserMetadata from 'supertokens-node/recipe/usermetadata';
import UserRoles from 'supertokens-node/recipe/userroles';
import { DataSource, Repository } from 'typeorm';

export function buildRecipeList(userRepo: Repository<User>) {
  return [
    EmailPassword.init({
      override: {
        apis: (original) =>
          ({
            ...original,
            signUpPOST: async (input) => {
              const res = await original.signUpPOST(input);

              if (res.status === 'OK') {
                // Assign default role
                await UserRoles.addRoleToUser(
                  'public',
                  res.user.id,
                  'consumer',
                );

                // Push it into the brand-new session’s access token
                await res.session.mergeIntoAccessTokenPayload({
                  roles: ['consumer'],
                });
              }

              return res;
            },
            signInPOST: async (input) => {
              const res = await original.signInPOST(input);

              if (res.status === 'OK') {
                const stId = res.user.id;

                const appUser = await userRepo.findOne({
                  where: { supertokensUserId: stId },
                  relations: { consumerProfile: true, vendorProfile: true },
                });

                /* --- stash the flag in the JWT --------------------- */
                await res.session.mergeIntoAccessTokenPayload({
                  profileComplete:
                    !!appUser?.consumerProfile || !!appUser?.vendorProfile,
                });
              }

              return res;
            },
          }) satisfies APIInterface,
      },
    }),
    Passwordless.init({
      contactMethod: 'EMAIL_OR_PHONE',
      flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
    }),
    Session.init({
      exposeAccessTokenToFrontendInCookieBasedAuth: true,
    }),
    Dashboard.init(),
    UserRoles.init(),
    UserMetadata.init(),
  ];
}

/* Helper so we can inject it later */
export const RecipeListProvider = {
  provide: 'SUPERTOKENS_RECIPE_LIST',
  useFactory: async (ds: DataSource) => {
    const userRepo = ds.getRepository(User);
    return buildRecipeList(userRepo);
  },
  inject: [DataSource],
};
