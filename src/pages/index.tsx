import { type NextPage } from "next";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { theme } from "@styles/muiTheme";
import Hero from "@components/Hero";
import { api } from "@utils/api";

const Home: NextPage = () => {
    return (
        <Container>
            <Hero />
            <VideoCounter />
            <About />
        </Container>
    );
};

export default Home;

const About = () => {
    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h2">About Parallel</Typography>
            <Typography variant="body1" color="textSecondary">
                <span
                    style={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                    }}
                >
                    Parallel
                </span>{" "}
                is a revolutionary platform that connects field experts with
                top-notch content creators to produce high-quality, educational
                content. Whether you're an educator looking to bring your
                lessons to life or an animator looking to bring your passion to
                the masses, Parallel is the perfect place for you. Our platform
                offers a user-friendly and intuitive experience that streamlines
                the collaboration process, making it easier than ever to create
                engaging and effective educational content. With advanced
                analytics and metrics, real-time collaboration tools, and
                priority matching, educators can focus on what they do best, and
                content creators can bring their skills to a wider audience.
                Join the Parallel community today and see the impact that a
                dedicated platform for education can have!
            </Typography>
        </Box>
    );
};

const VideoCounter = () => {
    const count = api.parallelStats.countCompletedVideos.useQuery();

    return (
        <Divider>
            <Box sx={{ mx: 4, my: 10 }}>
                <Typography variant="h4" color="secondary">
                    {count.data} videos
                </Typography>
                <Typography variant="body2">
                    created through Parallel
                </Typography>
            </Box>
        </Divider>
    );
};
