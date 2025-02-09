import axios from "axios";
import Rectangle from "../models/Rectangle";

const client = axios.create({
    baseURL: 'http://localhost:5080',
});

export const fetchRectangle = async (): Promise<Rectangle> => {
    const response = await client({
        method: "GET",
        url: "/api/rectangle"
    });

    return response.data;
};

export const saveRectangle = async (rectangle: Rectangle): Promise<boolean> => {
    const response = await client({
        method: "POST",
        url: "/api/rectangle",
        data: rectangle,
    });

    return response.data;
};