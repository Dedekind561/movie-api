import { Avatar, Box, Container, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { SearchIcon } from "@chakra-ui/icons";


const Navbar = () => {
const {user, signInWithGoogle, logout } = useAuth();

const handleGoogleLogin = async () => {
    try{
        await signInWithGoogle();
        console.log('success')
    }   catch (error) {
        console.log("err" , error)

        }
    }
  return (
    <Box py="4" mb="2">
        <Container maxW={'container.xl'}>
            <Flex justifyContent={"space-between"}>
                <Link to='/'>

                <Box 
                fontSize={"2xl"} 
                fontWeight={"bold"} 
                color={"red"} 
                letterSpacing={"widest"} 
                fontFamily={"mono"}
                >
                    NMDb
                </Box>
                </Link>
                
                {/* DESKTOP */}
                <Flex gap ="4" alignItems={"center"}> 
                    <Link to="/"> Home </Link>
                    <Link to="/movies"> Movies </Link>
                    <Link to="/shows"> TV Shows </Link>
                    <Link to="/search"> 
                    <SearchIcon fontSize="xl"/>
                     </Link>
                    {user && (
                        <Menu>
                            <MenuButton>
                                <Avatar 
                                bg={"red.500"} 
                                color={"white"} 
                                size={"sm"} 
                                name={user?.email}/>
                            </MenuButton>
                            <MenuList>
                                <Link to = "/watchlist"> 
                                <MenuItem> Watchlist </MenuItem>
                                </Link>
                                <MenuItem onClick={logout}> Logout </MenuItem>
                            </MenuList>
                        </Menu>
                    )}

                    {!user && (
                        <Avatar size={"sm"} bg={"gray.800"} as="button" onClick={handleGoogleLogin}/>
                    )}

                </Flex>
            </Flex>
        </Container>
    </Box>
  )
}

export default Navbar