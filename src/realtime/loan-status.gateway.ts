import { Server, Socket } from 'socket.io';
import { LoanStatusChangedEvent } from 'src/loan-applications/events/loan-status-changed.event';

import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/realtime',
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:8000',
      'https://los-lender-staging.middle-earth.in',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  },
})
export class LoanStatusGateway implements OnGatewayInit {
  @WebSocketServer() server!: Server;

  private readonly logger = new Logger(LoanStatusGateway.name);

  afterInit() {
    this.logger.log('✅ LoanStatusGateway initialised');
  }

  /* Listen for our domain event and broadcast */
  @OnEvent('loan.status.changed')
  handle(event: LoanStatusChangedEvent) {
    const room = `loan-${event.applicationId}`;
    this.logger.debug(`Emit to ${room}: ${event.newStatus}`);
    this.server.to(room).emit('loan-status', event);
  }

  @SubscribeMessage('subscribe-loan')
  handleSub(@MessageBody() loanId: string, @ConnectedSocket() client: Socket) {
    const room = `loan-${loanId}`;
    client.join(room);
    this.logger.debug(`Client ${client.id} joined ${room}`);
    client.emit('subscribed', loanId);
  }
}
