const BASE_URL = 'http://localhost:3001/api/v1';

export const login = async (email: string, password: string) => {
	try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
      		method: 'POST',
      		headers: {
      			'Content-Type': 'application/json',
      		},
      		body: JSON.stringify({ email, password }),
      	});
      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.error);
      }

      return data;
   } catch (error) {
      throw new Error((error as Error).message);
   }
};
