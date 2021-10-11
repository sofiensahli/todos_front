import {
  Grid,
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  Input,
} from "@material-ui/core";
import { useState } from "react";

export default function UpdateTOds({ category, setCategory, setModal, todos }) {
  const [title, setTitle] = useState(todos?.title);
  const [priority, setPriority] = useState(todos?.priority);
  const [description, setDescription] = useState(todos?.description);
  const [date, setDate] = useState(todos?.date);
  const [status, setStatus] = useState(todos?.status);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        description: description,
        title: title,
        date: date,
        priority: priority,
        cat_id: category.id,
        status: "finished",
        id: todos.id,
      })
    );

    formData.append("id", todos.id);

    formData.append("cat_id", category.id);
    formData.append("priority", priority + "");
    formData.append("date", date);
    formData.append("status", status);
    formData.append("title", title);
    formData.append("description", description);
    const result = await fetch("http://localhost:8000/updatetod", {
      method: "POST",

      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((value) => {
        return value;
      })
      .catch((error) => {
        console.log(error);
      });
    const json = await result
      .json()
      .then((value) => value)
      .catch((error) => console.log(error));
    console.log(json);
    category?.todos?.forEach((element, index) => {
      if (element.id === todos.id) category?.todos?.splice(index, 1, json);
    });

    setCategory({ ...category });
    setModal({ isShowing: false, content: null });
  };

  return (
    <>
      <Grid md={3} xl={3} />
      <Grid item xs={12} sm={12} md={6} xl={6}>
        <Paper style={{ marginRight: "2%", marginTop: "2%", padding: "1%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Typography variant="subtitle1">New To do task </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Divider />
              <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={6} xl={4}>
              <TextField
                label="Title"
                variant="standard"
                defaultValue={title}
                fullWidth
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} xl={4}>
              <TextField
                label="Description"
                variant="standard"
                defaultValue={description}
                fullWidth
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={4}>
              <TextField
                fullWidth
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                onChange={(event) => setDate(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} xl={4}>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                fullWidth
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </Grid>
            <Grid item md={6} xl={4} sm={12} xs={12}>
              <Button
                variant="contained"
                color={status === "in progress" ? "secondary" : "primary"}
                onClick={
                  status === "in progress" ? () => setStatus("Finished") : null
                }
                
              >
                {status === "in progress" ? "set Finished" : "Already finished"}
              </Button>
            </Grid>
            <Grid item md={6} xl={4} sm={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid md={3} xl={3} />
    </>
  );
}
