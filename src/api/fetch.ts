
class Fetch {
  base_url: string;
  app_key?: string;
  app_id?: string;

  constructor({ base_url, app_id, app_key }: { base_url: string, app_id?: string, app_key?: string}) {
    this.base_url = base_url;
    this.app_key = app_key;
    this.app_id = app_id;
  }

  async makeRequest(query: string): Promise<any> {
    const response = await fetch(`${this.base_url}${query}&app_id=${this.app_id}&app_key=${this.app_key}`);
    return response.json();
  }
}

export default Fetch;
