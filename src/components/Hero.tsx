import { Grid, Typography, Divider, Card, CardActionArea } from "@mui/material";
import { theme } from "@styles/muiTheme";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Hero = () => {
    return (
        <Grid
            container
            alignItems="center"
            columnSpacing={8}
            rowSpacing={6}
            sx={{ mt: { xs: 0, sm: 8 } }}
        >
            <Grid item xs={12} md={7}>
                <Typography
                    variant="h1"
                    color="primary"
                    display={{ xs: "inline", sm: "block" }}
                >
                    Collaborate
                </Typography>
                <Typography
                    variant="h1"
                    display={{ xs: "inline", sm: "block" }}
                >
                    {" "}
                    with experts.
                </Typography>
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

export default Hero;

const SignUpCTA = () => {
    return (
        <Card>
            <CardActionArea
                onClick={() => alert("TODO: Navigate to sign up")}
                sx={{ p: 5 }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <Grid item>
                        <Typography variant="h3" color="primary">
                            Get Started
                        </Typography>
                        <Typography>Sign up here</Typography>
                    </Grid>
                    <Grid item>
                        <PlayArrowRoundedIcon
                            sx={{
                                fontSize: 64,
                                transition: "color 0.1s ease-in-out",
                            }}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};
