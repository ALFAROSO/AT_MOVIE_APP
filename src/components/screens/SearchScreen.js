import { useNavigationState } from "@react-navigation/native";
import SearchCont from "../containers/SearchCont";

const SearchScreen = () => {

    const routeName = useNavigationState(state => state.routes[state.index].name);

    return <SearchCont activetab={routeName} />;
    
};

export default SearchScreen;
