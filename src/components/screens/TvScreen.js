import { useNavigationState } from "@react-navigation/native";
import TvCont from "../containers/TvCont";

const TvScreen = () =>{

    const routeName = useNavigationState(state => state.routes[state.index].name);

    return <TvCont activetab={routeName}/>
    
} 

export default TvScreen;