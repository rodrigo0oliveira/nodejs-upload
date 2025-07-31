jest.mock('../../../services/auth-service.js');
jest.mock('../../../database/db.js',()=> jest.fn());

const request = require('supertest');
const server = require('../../../../server');
const authService = require('../../../services/auth-service');

describe('Auth controller test',()=>{

    test('Test /login when email and password should be succesfull',async ()=>{
        const mockToken = "tokenMock";

        authService.verifyIfEmailExists.mockResolvedValue(true);
        authService.isPasswordMatch.mockResolvedValue(true);
        authService.createToken.mockResolvedValue(mockToken);

        const response = await request(server)
                                .post('/api/auth/login')
                                .send({
                                    email:'teste@gmail.com',
                                    password:'123456'
                                })
                                .expect(200);

        expect(response.body.success).toBe(true);
    });
    
    test('Test /login when password are wrong should not be succesfull',async ()=>{

        authService.verifyIfEmailExists.mockResolvedValue(true);
        authService.isPasswordMatch.mockResolvedValue(false);

        const response = await request(server)
                                .post('/api/auth/login')
                                .send({
                                    email:'teste@gmail.com',
                                    password:'1234'
                                })
                                .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Invalid e-mail or password!');
    });
    
    test('Test /register when email already exists should not be succesfull',async ()=>{
        authService.verifyIfEmailExists.mockResolvedValue(true);

        const response = await request(server)
                                .post('/api/auth/register')
                                .send({
                                    username:'username',
                                    email:'existent@gmail.com',
                                    password:'122345',
                                })
                                .expect(400);

        expect(response.body.message).toEqual('Email already exists,try with another email adress');
    })

    test('Test /register when all information is right should be successfull',async ()=>{
        authService.verifyIfEmailExists.mockResolvedValue(false);
        authService.createUser.mockResolvedValue({username:'user',email:'email@gmail'});

        const response = await request(server)
                                .post('/api/auth/register')
                                .send({
                                    username:'username',
                                    email:'new@gmail.com',
                                    password:'122345',
                                })
                                .expect(201);

        expect(response.body.message).toEqual('User created with success');
    });

});