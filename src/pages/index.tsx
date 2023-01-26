import { type NextPage } from "next";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { theme } from "@styles/muiTheme";
import Hero from "@components/Hero";
import { api } from "@utils/api";

const Home: NextPage = () => {
    return (
        <Container>
            <Hero />
            <About />
            <VideoCounter />
        </Container>
    );
};

export default Home;

const About = () => {
    return (
        <Box sx={{ my: 20 }}>
            <Typography variant="h2">About Parallel</Typography>
        </Box>
    );
};

const VideoCounter = () => {
    const hello = api.example.hello.useQuery({ text: "from tRPC" });

    return (
        <Divider>
            <Box sx={{ mx: 4, my: 10 }}>
                <Typography variant="h4" color="secondary">
                    0 videos
                </Typography>
                <Typography variant="body2">
                    created through Parallel
                </Typography>
            </Box>
        </Divider>
    );
};
