jest.mock('../../../models/User.js',()=> ({ 
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('../../../helpers/utils/passwordUtils.js',()=>({
    isPasswordMatch:jest.fn(),
    encriptPassword:jest.fn()
}))

const authService = require('../../../services/auth-service.js');
const  User = require('../../../models/User.js');


const email = 'test@gmail.com';
describe('Auth service tests',()=>{

    test('Verify if email exist should return false when user dont exist',async ()=>{
        User.findOne.mockResolvedValue(null);

        const result = await authService.verifyIfEmailExists(email);

        expect(result).toEqual(false);
    });

    test('Verify if email exist should return true when user exist',async ()=>{
        User.findOne.mockResolvedValue({
            username:'test',
            email:email,
            password:'testpassword'
        });

        const result = await authService.verifyIfEmailExists(email);

        expect(result).toEqual(true);
    });

    test('Update password when user dont exist should throw error',async ()=>{
        const password = '1234';
        const id = 1;
        User.findOne.mockResolvedValue(null);

        await expect(authService.updatePassword(password,id)).rejects.toThrow('User not found!');
    });

    test('Update password when password is not equal to old password should update user',async ()=>{
        const mockSave = jest.fn().mockResolvedValue(true);

        User.findOne.mockResolvedValue({
            username:'testusername',
            email:'test@email.com.br',
            password:'12345678',
            role:'Admin',
            save:mockSave
        });


        expect(await authService.updatePassword('1234',1)).toBe('Password updated successfuly!');
    });


    test('Update password when password is equal to old password should throw error',async ()=>{
        const mockSave = jest.fn().mockResolvedValue(true);

        User.findOne.mockResolvedValue({
            username:'testusername',
            email:'test@email.com.br',
            password:'12345678',
            role:'Admin',
            save:mockSave
        });

        authService.isPasswordMatch.mockResolvedValue(true);

        await expect(authService.updatePassword('1234',1)).rejects.toThrow(new Error('The new password cannot be equals to old password'));
    });
});