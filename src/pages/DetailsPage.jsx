import { Badge, Box, Button, CircularProgress, CircularProgressLabel, Container, Flex, Heading, Image, Img, Spinner, Text, useToast, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchCredits, fetchDetails, fetchVideos, imagePath, imagePathOriginal } from "../services/api";
import { base, video } from "framer-motion/client";
import { image } from "framer-motion/m";
import { CalendarIcon, CheckCircleIcon, SmallAddIcon, TimeIcon } from "@chakra-ui/icons";
import { minutesTohours, ratingToPercentage, resolveRatingColor } from "../utils/helpers";
import VideoComponent from "../components/VideoComponent";
import { useAuth } from "../context/useAuth";

const DetailsPage = () => {
    const router = useParams();
    const {type, id} = router;

    const {user} = useAuth();
    const toast = useToast();

    const [details, setDetails] = useState({});
    const [cast, setCast] = useState([]);
    const [video, setVideo] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetails(type, id)
        .then((res) => {
            console.log(res, 'res')
            setDetails(res)
        })
        .catch((err) => {
            console.log(err, 'err')
        })
        .finally(() => {
        setLoading(false);
        });
    }, [type,id]);

//multiple promises /api requests 
    useEffect(() => {
        const fetchData = async () => {
            try {
             const[detailsData, creditsData, videosData] =  await Promise.all ([
                fetchDetails(type, id),
                fetchCredits(type, id),
                fetchVideos(type, id),
              ]); 

              //set details 
              setDetails(detailsData)

              //set cast
              setCast(creditsData?.cast?.slice(0, 20));

              //set videos
              const video = videosData?.results
              ?.find((video) => video?.type === "Trailer"
            );
              setVideo(video);
              const videos = videosData?.results
              ?.filter((video) => video?.type !== "Trailer")
              ?.slice(0, 10);
              setVideos(videos);
            } catch (error) {
              console.log(error,"error");
            } finally {
                setLoading(false);
            }  
        };

        fetchData();
    }, [type, id]);

    console.log(video, videos, 'videos');

    const handleSaveToWatchlist = async () => {

        if(!user) {
            toast ({
                title: "Please login to add to watchlist.",
                status: "error",
                isClosable: true,
            });
            
            return;
        }
            
        const data = {
            id: details?.id,
            title: details?.title || details?.name,
            type: type,
            poster_path: details?.poster_path,
            release_date: details?.release_date || details?.first_air_date,
            vote_average: details?.vote_average,
            overview: details?.overview
        
        }
        console.log(data, "data");
    }

    if (loading) {
        return (
            <Flex justify={"center"}>
                <Spinner size={"xl"} color="red" />
            </Flex>
        )
    }

  const title = details?.title || details?.name;  
  const releaseDate = type ==="tv" ? details?.first_air_date : details?.release_date;
    
  return (
    <Box>
   <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${imagePathOriginal}/${details?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{base: "auto", md:"500px"}}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        alignItems={"center"}
        >
            <Container maxW={"container.xl"}>
                <Flex 
                alignItems={"center"}
                gap="10"
                flexDirection={{base: "column", md: "row"}}
                >
                    <Image 
                    height={"450px"} 
                    borderRadius={"sm"} 
                    src={`${imagePath}/${details?.poster_path}`} 
                    />
                    <Box>
                        <Heading fontSize= {"3xl"}> 
                            {title}
                            {" "}
                            <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                            {new Date(releaseDate).getFullYear()}
                            </Text>

                        </Heading>
                        <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                        <Flex alignItems={"center"}>
                            <CalendarIcon mr={2} color={"gray.400"}/>
                            <Text fontSize={"sm"} >
                            {new Date(releaseDate).toLocaleDateString("en-UK")} (UK)   
                            </Text>
                        </Flex>
                        {type === "movie" && (
                            <>
                            <Box> * </Box>
                            <Flex alignItems={"center"}>
                                <TimeIcon mr={"2"} color={"gray.400"}/>
                                <Text fontSize={"sm"}> {minutesTohours(details?.runtime)}</Text>
                            </Flex>
                            </>
                        )}
                        </Flex>

                        <Flex alignItems={"center"} gap={"4"}>
                            <CircularProgress 
                            value={ratingToPercentage(details?.vote_average)} 
                            bg={"gray.800"} 
                            borderRadius={"full"} 
                            p={"0.5"} 
                            size={"70px"} 
                            color={resolveRatingColor(details?.vote_average)} 
                            thickness={"6px"}
                            >
                                <CircularProgressLabel fontSize={"lg"}>
                                    {ratingToPercentage(details?.vote_average)}{" "}
                                    <Box as="span" fontSize={"10px"}>%</Box>

                                </CircularProgressLabel>
                            </CircularProgress>
                            <Text display={{base: "none", md: "initial"}}> 
                                User Score 
                            </Text>
                            <Button 
                            display={"none"}
                            leftIcon={<CheckCircleIcon />} 
                            colorScheme="green" 
                            variant={"outline"} 
                            onClick={() => console.log("click")}
                            >
                             In watchlist 
                             </Button>

                             <Button 
                            leftIcon={<SmallAddIcon />} 
                            variant={"outline"} 
                            onClick={handleSaveToWatchlist}
                            >
                             Add to watchlist 
                             </Button>

                        </Flex>
                        <Text
                        color={"gray.400"}
                        fontSize={"sm"}
                        fontStyle={"italic"}
                        my="5"
                        >
                            {details?.tagline}
                        </Text>
                        <Heading
                        fontSize={"xl"}
                        mb={"3"}
                        >Overview</Heading>
                        <Text fontSize={"md"} mb={"3"}> {details?.overview} </Text>
                        <Flex mt="6" gap="2"> 
                            {details?.genres?.map((genre) => (
                                <Badge key={genre?.id} p="1"> {genre?.name} </Badge>
                            ))}
                        </Flex>
                    </Box>

                </Flex>
            </Container>
        </Box>
        <Container maxW={"container.xl"} pb="10">
            <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="1"> 
                Cast 🎭
            </Heading>
            <Flex 
            mt="5" 
            mb="10" 
            overflowX={"scroll"} 
            gap={"5"}
            >
                {cast?.length === 0 && <Text> No cast found 👻 </Text>}
                {cast && cast?.map((item) => (
                <Box key={item?.id} minW= {"150px"}> 
                    <Image src={`${imagePath}/${item?.profile_path}`} w={"100%"} h={"225px"} objectFit={"cover"} borderRadius={"sm "}/>
                </Box>
                ))}
            </Flex>

            <Heading 
            as="h2" 
            fontSize={"md"} 
            textTransform={"uppercase"} 
            mt="10" 
            mb="5"
            > 
            Vidoes 🎞️ 
            </Heading>
            <VideoComponent id={video?.key}/>
            <Flex 
            mt="5" 
            mb="10" 
            overflowX={"scroll"} 
            gap={"5"}
            > 
                {videos && videos?.map((item) => (
                    <Box key={item?.id} minW={"280px"}> 
                        <VideoComponent id={item?.key} small/> 
                        <Text fontSize={"sm"} fontWeight={"bold"} mt="5" noOfLines={"2"}> 
                            {item?.name}{" "} 
                        </Text>
                    </Box>
                ))}
            </Flex>
        </Container>
    </Box>
  );
};

export default DetailsPage;