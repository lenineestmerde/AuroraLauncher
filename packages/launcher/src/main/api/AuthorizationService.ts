import { Service } from 'typedi';

import { APIManager } from './APIManager';

export interface UserData {
    username: string;
    userUUID: string;
}

export interface Session extends UserData {
    accessToken: string;
}

@Service()
export class AuthorizationService {
    private currentSession?: Session;

    constructor(private apiService: APIManager) {}

    async authorize(login: string, password: string): Promise<UserData> {
        this.currentSession = await this.apiService.auth(login, password);
        const { userUUID, username } = this.currentSession;
        return { userUUID, username };
    }

    getCurrentSession() {
        return this.currentSession;
    }
}
