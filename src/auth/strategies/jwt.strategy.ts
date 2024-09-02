import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ForbiddenException, Injectable } from "@nestjs/common";
import { UsuarioPayload } from "../model/UsuarioPayload";
import { UsersEntity } from '@prisma/client';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private usuarioService: UsuarioService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    
    async validate(payload: UsuarioPayload): Promise<UsersEntity> {
        console.log(payload);
        const userEntity = await this.usuarioService.buscaPorId(payload.id);
        console.log(userEntity);
        if (!userEntity) throw new ForbiddenException('Usuario não encontrado');
        return userEntity;
    }
}