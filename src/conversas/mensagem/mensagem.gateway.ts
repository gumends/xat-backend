import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversasService } from '../conversas.service';
@WebSocketGateway({ cors: true })
export class MensagemGateway {
  @WebSocketServer() server: Server;
  constructor(
    private conversasService: ConversasService
  ) { }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {
    
    
    this.conversasService.criarConversa(payload)
      .then((res) => {
        this.server.emit('message', {
          ...payload,
          created_at: res.created_at
        });
      }) 
  } 
 

}