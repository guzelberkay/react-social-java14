import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRegister } from "../../components/models/IRegister";
import { ILogin } from "../../components/models/ILogin";
import { IResponse } from "../../components/models/IResponse";
const initialAuthState={
    token: '',
    user: [],
    isLoadingLogin: false,
    isLoadingRegister: false,
    isAuth: false
}
/**
 * @param {userName, password, rePassword, email} payload
 */
export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async(payload: IRegister)=>{
        const response =  await fetch('http://localhost:9090/user/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'userName': payload.userName,
                'password': payload.password,
                'rePassword': payload.rePassword,
                'email': payload.email
            })
        }).then(data => data.json())
        return response;
    }
);

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async(payload: ILogin)=>{
        try{
        const response =  await fetch('http://localhost:9090/user/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'userName': payload.userName,
                        'password': payload.password
                    })
                }).then(data=> data.json())
            return response;            
             
        }catch(err){
            console.log('hata...: ', err);            
        }
      
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers:{},
    extraReducers: (build)=>{
        build.addCase(fetchRegister.pending,(state)=>{
            state.isLoadingRegister = true;
        });
        build.addCase(fetchRegister.fulfilled,(state)=>{
            state.isLoadingRegister = false;
        });
        build.addCase(fetchLogin.pending,(state)=>{
            state.isLoadingLogin = true;
        })
        build.addCase(fetchLogin.fulfilled,(state,action)=>{            
            state.isLoadingLogin = false;
            if(action.payload.code === 200){
                state.token = action.payload.data;
                
            }else if(action.payload.code === 400)
                alert(action.payload.message)
            
        })
    }
});

export default authSlice.reducer;