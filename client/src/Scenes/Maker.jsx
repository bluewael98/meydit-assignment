import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MakerForm from "../Components/MakerForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Maker = () => {
  const [jobs, setJobs] = useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3333/api/v1/jobs/");
        setJobs(response.data);
        console.log("Jobs fetched", response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex justify-center items-center py-10">
      {jobs.map((job) => (
        <Card key={job.id} sx={{ maxWidth: 600 }}>
          <CardHeader title={job.first_name} subheader={job.last_name} />
          <CardMedia
            component="img"
            height="200"
            image={job.image}
            alt="job image"
            className="object-cover rounded-lg px-2"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.state}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {job.first_name} {job.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.clothing_type}{" "}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.budget}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.phone_number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.postcode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.state}
              </Typography>
              <MakerForm />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default Maker;
