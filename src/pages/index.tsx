import { type NextPage } from "next";
import {
    Card,
    CardActionArea,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { theme } from "@styles/muiTheme";
import EastIcon from "@mui/icons-material/East";
import useHover from "@hooks/useHover";

const Home: NextPage = () => {
    return (
        <Container>
            <Hero />
            {/* Sign Up */}
        </Container>
    );
};

export default Home;

const Hero = () => {
    return (
        <Grid container alignItems="center" columnSpacing={8} sx={{ mt: 8 }}>
            <Grid item xs={12} md={7}>
                <Typography variant="h1" color="primary">
                    Collaborate
                </Typography>
                <Typography variant="h1"> with experts.</Typography>
                <Typography variant="h1">Educate the world.</Typography>
                <Divider sx={{ my: 2 }} />
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="textSecondary">
                    At{" "}
                    <span
                        style={{
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                        }}
                    >
                        Parallel
                    </span>
                    , our mission is to make high-quality educational content
                    accessible to all. By connecting educators with experienced
                    creators, we make it easy to create engaging and informative
                    videos that can be used in the classroom or online. Join us
                    and make a difference in the world of education.
                </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
                <SignUpCTA />
            </Grid>
        </Grid>
    );
};

const SignUpCTA = () => {
    const [hoverRef, isHovered] = useHover();

    return (
        <Card ref={hoverRef}>
            <CardActionArea
                onClick={() => alert("TODO: Navigate to sign up")}
                sx={{ px: 5, py: 5 }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            variant="h3"
                            color={isHovered ? "primary" : "textPrimary"}
                        >
                            Get Started
                        </Typography>
                        <Typography>Sign up here</Typography>
                    </Grid>
                    <Grid item>
                        <EastIcon
                            sx={{ fontSize: 48 }}
                            color={isHovered ? "primary" : undefined}
                        />
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};
