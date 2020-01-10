export interface environmentInterface
{
    production: boolean;
    log: boolean;
    lang: string;
    apiUrl: string;
    marketplace?: string;
    grant_type: 'password';
    client_id: string;
    client_secret: string;
    business_id?: number;
    defTheme?: string;
    google_api_key?: string;
};