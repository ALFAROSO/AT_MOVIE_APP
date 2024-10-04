import { useNavigationState } from "@react-navigation/native";
import MoviesCont from "../containers/MovieCont";

const HomeScreen = () => {

    const routeName = useNavigationState(state => state.routes[state.index].name);

    return  <MoviesCont activetab={routeName} />
    
}

export default HomeScreen;