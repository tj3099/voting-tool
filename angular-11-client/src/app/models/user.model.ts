export class User {
  mail: string = '';
  secretKey?: string = '';
  hasVoted?: boolean = false;
  sessionId: string = '';
  grants: number = 0;
}

