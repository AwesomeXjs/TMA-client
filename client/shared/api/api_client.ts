export interface IPortfolioData {
    name: string,
    ownerID: number
}

export interface IApiClient {
    createPortfolio: ({name, ownerID}: IPortfolioData) => Promise<void>
}


export class ApiService implements IApiClient {
    private readonly baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async createPortfolio(portfolioData: IPortfolioData, token: string) {
        try {
            const response = await $fetch(`/api/v1/create-portfolio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'TGWebAppToken': `TGWebApp ${token}`,
                },
                body: JSON.stringify({
                    "name": portfolioData.name,
                    "owner_id": portfolioData.ownerID
                }),
                baseURL: this.baseUrl,
            });

            console.log("response: ", response);

        } catch (error) {
            console.log("error: ", error);
        }
    }
}