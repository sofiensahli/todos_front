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
import { DatePicker } from "@material-ui/pickers";
import { useState } from "react";
export default function AddToDo({ category, setCategory, setIsAddView }) {
  const [image, setIamge] = useState({ image: null });
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2017-05-24");
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIamge({
        ...{
          image: URL.createObjectURL(event.target.files[0]),
          path: event.target.files[0],
        },
      });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", image.path);
    formData.append(
      "data",
      JSON.stringify({
        description: description,
        title: title,
        date: date,
        priority: priority,
        cat_id: category.id,
        status: "in progress",
      })
    );
    formData.append("cat_id", category);
    formData.append("priority", priority + "");
    formData.append("date", date);
    formData.append("status", "in progress");
    formData.append("title", title);
    formData.append("description", description);
    const result = await fetch("http://localhost:8000/newtod", {
      method: "POST",
      body: formData,
    })
      .then((value) => {
        console.log(value);
        return value;
      })
      .catch((error) => {
        console.log(error);
      });
    const json = await result
      .json()
      .then((value) => value)
      .catch((error) => console.log(error));
    category?.todos?.push(json);
    console.log(json);
    setCategory({ ...category });
    setIsAddView(false);
  };

  return (
    <Grid item xs={12} sm={12} md={12} xl={12}>
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
              fullWidth
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} xl={4}>
            <TextField
              label="Description"
              variant="standard"
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

          <Grid item xs={12} sm={12} md={6} xl={4} zeroMinWidth>
            <Input
              fullWidth
              disableUnderline
              color="primary"
              type="file"
              onChange={onImageChange}
              id="file"
              name="file"
            />
          </Grid>
          <Grid item md={6} xl={4} sm={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
