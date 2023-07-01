
import { getImages, getText } from '../service/api';

    export const generateImages=(despcription)=>{
        const desp=despcription;
        return getImages({description:desp});
        
    };
