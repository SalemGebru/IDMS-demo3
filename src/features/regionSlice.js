import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createRegion=createAsyncThunk(
    'region/create',
    async({FormData},{rejectWithValue})=>{
        try{
            let token=JSON.parse(localStorage.getItem('token'));
            await axios.post('http://localhost:8000/api/regions',FormData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data);
                toast.success("Region saved");
                return;
            }).catch(error=>{
                console.log(error.response);
                toast.error("Failed to save region");
                return;
            })
            /*let regionId;
            let storedRegions = JSON.parse(localStorage.getItem('region')) || [];
            console.log(storedRegions);
            
            if (!Array.isArray(storedRegions)) {
                storedRegions = [storedRegions];
            }

            if (storedRegions.length === 0) {
                let lastRegionId=0;
                regionId=lastRegionId+1;
            } else {
                const lastRegion = storedRegions.pop();
                if (lastRegion && lastRegion.id) {
                    let lastRegionId = lastRegion.id;
                     lastRegionId=parseInt(lastRegionId,10);
                      regionId=lastRegionId+1;
                      
                } else {
                    let lastRegionId=0;
                    regionId=lastRegionId+1;
                }
                storedRegions.push(lastRegion);
            }

            const isRegionRegistered=storedRegions.some(storedRegion=>storedRegion.code===FormData.code)
            if(isRegionRegistered){
                toast.error('Region already exists');
                return;
            }
            

            let newRegion={
                id:regionId,
                name:FormData.name,
                code:FormData.code
            }
            storedRegions.push(newRegion);
            localStorage.setItem('region',JSON.stringify(storedRegions));
            toast.success('Region saved successfully');
            return newRegion;*/
        }catch(error){
            toast.error('Failed to save region');
            return rejectWithValue(error.message);
        }
    }
)

export const getRegion=createAsyncThunk(
    'region/get',
    async(_,{rejectWithValue})=>{
        try{
            let token=JSON.parse(localStorage.getItem('token'));
            console.log(localStorage.getItem('token')); 
            let response=await axios.get('http://localhost:8000/api/regions',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            let data=response.data.data;
            console.log(data);
            let returneddata=Array.isArray(data)?data:[data];
            console.log(returneddata)
            return returneddata;
            /*let storedRegions=JSON.parse(localStorage.getItem('region'))||[];
        if(!Array.isArray(storedRegions)){
            storedRegions=[];
        }
        if(storedRegions){
            return storedRegions;
        }
       */
       }catch(error){
            return rejectWithValue(error.message);
        }
    }
)

export const updateRegion=createAsyncThunk(
    'region/update',
    async({Id,FormData},{rejectWithValue})=>{
        try{
            let token=JSON.parse(localStorage.getItem('token'));
            await axios.put(`http://localhost:8000/api/regions/${Id}`,FormData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then(response=>{
                console.log(response.data);
                toast.success("Region updated");
                return;
            }).catch(error=>{
                console.log(error.response);
                toast.error("Failed to update region");
                return;
            })
            /*let storedRegions = JSON.parse(localStorage.getItem('region')) || [];
            console.log(storedRegions);
            
            if (!Array.isArray(storedRegions)) {
                storedRegions = [storedRegions];
            }

            const regionIndex = storedRegions.findIndex(storedRegion => {
               
                return String(storedRegion.id).trim() === String(Id).trim();  
            });

            console.log(regionIndex)

            if (regionIndex === -1) {
                return rejectWithValue('Region not found');
            }

            const updatedRegion={
                ...storedRegions[regionIndex],
                name:FormData.name,
                code:FormData.code
            }

            console.log(updatedRegion)
            if(updatedRegion){
                storedRegions[regionIndex]=updatedRegion;
                localStorage.setItem('region',JSON.stringify(storedRegions));
                toast.success('Region Updated Successfully');
                return updatedRegion
            }*/

        }catch(error){
            toast.error('Failed to update');
            return rejectWithValue(error.message);
        }
    }
)

export const deleteRegion=createAsyncThunk(
    'region/delete',
    async({Id},{rejectWithValue})=>{
        try{
            let token=JSON.parse(localStorage.getItem('token'));
            await axios.delete(`http://localhost:8000/api/regions/${Id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then(response=>{
                toast.success('Delete Successful');
                console.log(response);
            })
            .catch(error=>{
                console.log(error);
            })
            /*let storedRegions = JSON.parse(localStorage.getItem('region')) || [];
            console.log(storedRegions);
            
            if (!Array.isArray(storedRegions)) {
                storedRegions = [storedRegions];
            }
            
            storedRegions = storedRegions.filter(storedRegion => {
                return String(storedRegion.id).trim() !== String(Id).trim();
              });
            
              if(!storedRegions){
                return rejectWithValue('Region not found');
             }
              
        console.log(storedRegions)
        localStorage.setItem('region',JSON.stringify(storedRegions));
        toast.success('Region deleted successfully');
        return storedRegions;*/

        }catch(error){
            toast.error('Failed to delete region');
            return rejectWithValue(error.message);
        }
    }
)

export const deleteBunch=createAsyncThunk(
    'region/deletebunch',
    async({Id},{rejectWithValue})=>{
        try{
            let storedRegions = JSON.parse(localStorage.getItem('region')) || [];
            console.log(storedRegions);
            
            console.log(Id);
            if (!Array.isArray(storedRegions)) {
                storedRegions = [storedRegions];
            }

            const regionCodesToRemove = Object.keys(Id).filter(id => Id[id]); 
            console.log(regionCodesToRemove)
            

            storedRegions = storedRegions.filter(
             storedRegion => !regionCodesToRemove.includes(String(storedRegion.id))
            );


            console.log(storedRegions)

            localStorage.setItem('region',JSON.stringify(storedRegions));
            toast.success('Delete successful');
            return storedRegions;            

        }catch(error){
            toast.error('Failed to delete');
            return rejectWithValue(error.message);
        }
    }
)

const regionSlice=createSlice({
    name:'Region',
    initialState:{
        name:'',
        code:'',
        region:[]

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createRegion.fulfilled,(state,action)=>{
            state.region=[...state.region,action.payload]
        })
        .addCase(updateRegion.fulfilled,(state,action)=>{
            state.region=[...state.region,action.payload]
        })
        .addCase(deleteRegion.fulfilled,(state,action)=>{
            state.region=[...state.region,action.payload]
        })
        .addCase(deleteBunch.fulfilled,(state,action)=>{
            state.region=[...state.region,action.payload]
        })
    }
        
})

export default regionSlice.reducer;