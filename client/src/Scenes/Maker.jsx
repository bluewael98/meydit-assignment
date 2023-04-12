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
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import MakerForm from "../Components/MakerForm";
import { formatDistance } from "date-fns";
import { enAU } from "date-fns/locale";

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
          <CardHeader
            title={job.first_name}
            subheader={job.last_name}
            className="text-primary"
          />
          <CardMedia
            component="img"
            height="200"
            image={job.image}
            alt="job image"
            className="object-cover rounded-lg px-2"
          />
          {expanded ? (
            ""
          ) : (
            <CardContent className="gap-1 flex flex-col">
              <div>
                <Typography variant="body1" color="text.primary">
                  Clothing Type
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.clothing_type}{" "}
                </Typography>
              </div>
              <div>
                <Typography variant="body1" color="text.primary">
                  Job Description
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {job.description}
                </Typography>
              </div>
              <Typography variant="body2" className=" text-green-600">
                Posted{" "}
                {formatDistance(new Date(job.created_at), new Date(), {
                  locale: enAU,
                })}{" "}
                ago.
              </Typography>
            </CardContent>
          )}

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
            <CardContent className="flex flex-col gap-3">
              <div className="flex gap-1 flex-col">
                <Typography variant="body1" color="text.primary">
                  Customer details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Person2Icon /> {job.first_name} {job.last_name}.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <HomeIcon /> {job.address} {job.postcode}, {job.state}.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EmailIcon /> {job.email}
                </Typography>
              </div>
              <div className="flex flex-col gap-1">
                <>
                  <Typography variant="body1" color="text.primary">
                    Job Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                </>
                <>
                  <Typography variant="body1" color="text.primary">
                    Clothing Type
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.clothing_type}{" "}
                  </Typography>
                </>
                <>
                  <Typography variant="body1" color="text.primary">
                    Budget
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.budget}
                  </Typography>
                </>
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="body1" color="text.primary">
                  Submit Quote:
                </Typography>
                <MakerForm consumerData={job} />
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default Maker;
