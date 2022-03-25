import axios from "axios";

export async function getStrategy(id) {
    const response = await axios.get(`strategy/${id}`);

    return response.data;
}

export async function getAllStrategies() {
    const response = await axios.get('strategy');
    const flexStrategy = response.data[0];

    const strategies = [
        {
            id: flexStrategy._id,
            name: flexStrategy.name,
            risk_factor: '1/5',
            apy: '1.23%',
            type: 'Cascade'
        }
    ];

    return strategies;
}

