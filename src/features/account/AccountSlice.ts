import agent from "../../app/api/agent";
import { User } from "../../app/models/User";
import { router } from "../../app/router/Router";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";


interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User,  FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', JSON.stringify(user.userRole));
            localStorage.setItem('userName', JSON.stringify(user.username));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', JSON.stringify(user.userRole));
            localStorage.setItem('userName', JSON.stringify(user.username));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) =>{
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            console.log(action.payload)
        })
    })
})

export const {signOut, setUser} = accountSlice.actions;