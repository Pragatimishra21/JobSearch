import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Grid, Button, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/Job/NewJobModal";
import { Close as CloseIcon } from '@material-ui/icons';
import { firestore } from "./firebase/config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([]);

  const [customSearch, setCustomSearch] = useState(false);

  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({})
  const fetchJobs = async () => {
    setLoading(true);
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc').get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate() }));
    setJobs(tempJob);
    setLoading(false);
  };

  const fetchJobsCustom = async jobSearch => {
    setCustomSearch(false);
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc').
      where("location", '==', jobSearch.location)
      .where("type", "==", jobSearch.type).get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate() }));
    setJobs(tempJob);
    setLoading(false);
  }
  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: firebase.firestore.Timestamp.now()
    });
    fetchJobs();
  };


  useEffect(() => {
    fetchJobs();
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal closeModal={() => setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob} />
      <ViewJobModal job={viewJob} closeModal={()=> setViewJob({})} />
      <Box mb={3}>
        <Grid container justifyContent="center">

          <Grid item xs={10}>
            <Searchbar fetchJobsCustom={fetchJobsCustom} />

            {loading ? (
              <Box display="flex" justifycontent="center"><CircularProgress /></Box>
            ) : (
              <>
                {customSearch && (
                  <Box my={2} display="flex" jusifycontent="flex-end">
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => (
                  <JobCard open={() => setViewJob(job)} key={job.id} {...job} />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}