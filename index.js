import { ApolloServer } from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
// Creación del esquema GraphQL
const typeDefs = `

    type Inventory {
        id_product: String
        name: String
        price: Float
        number: Int
        description: String
        brand: String
    }

    type Query {
        inventories: [Inventory]
        findById(id_product:String): Inventory
    }
`;

// URL base de la API RESTful
const apiUrl = 'https://tallerii.fly.dev/inventory';

// Función para realizar solicitudes HTTP a la API RESTful utilizando fetch
const fetchFromAPI = async (endpoint, method = 'GET', data = null) => {
    const url = `${apiUrl}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`Error al obtener datos de la API RESTful: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error al obtener datos de la API RESTful', error);
        throw new Error('No se pudieron obtener los datos de la API RESTful');
    }
};

// Modificación de la función findByGender para consumir la API RESTful utilizando fetch


// Resolvers
const resolvers = {
    Query: {
        inventories: async () => {
            try {
                // Realiza una solicitud GET a la API RESTful para obtener todos los libros
                const endpoint = '/';
                const response = await fetchFromAPI(endpoint);
                console.log(response);
                const data = response.data
                return data;
            } catch (error) {
                throw error;
            }
        },
        findById: async (parent, args, contextValue, info) => {
            try {
                console.log(args.id_product);
                // Realiza una solicitud GET a la API RESTful para obtener un libro por ID
                const endpoint = `/:${args.id_product}`;
                const response = await fetchFromAPI(endpoint);
                console.log(response);
                const data = response.data
                return data;
            } catch (error) {
                throw error;
            }
        },
    },

    
};

// Instancia del servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen : {port : 3000}
})

console.log(`server ready at ${url}`);