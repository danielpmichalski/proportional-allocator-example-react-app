import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Button, Grid } from "@mui/material";
import Slider from "@mui/material/Slider";
import { ProportionalAllocator } from "proportional-allocator";
import React from "react";
import "./App.css";

function App() {
  const [sliders, setSliders] = React.useState<number[]>([]);
  const allocator = new ProportionalAllocator();

  const updateRawSliders = React.useCallback(() => {
    setSliders(
      allocator
        .getAllocations()
        .map((v) => parseFloat((v * 100).toPrecision(4)))
    );
  }, [setSliders]);

  const addSlider = React.useCallback(() => {
    allocator.push();
    updateRawSliders();
  }, [updateRawSliders]);

  const updateSliders = React.useCallback(
    (index: number, value: number) => {
      allocator.update(index, value / 100);
      updateRawSliders();
    },
    [updateRawSliders]
  );

  const onSliderChange = React.useCallback(
    (index: number) => {
      return (_: Event, value: number | number[]) => {
        updateSliders(index, value as number);
      };
    },
    [updateSliders]
  );

  const deleteSlider = React.useCallback(
    (index: number) => {
      allocator.remove(index);
      updateRawSliders();
    },
    [updateRawSliders]
  );

  const toSlider = React.useCallback(
    (value: number, index: number) => (
      <>
        <Grid item xs={10}>
          <Slider
            className="slider"
            onChange={onSliderChange(index)}
            key={index}
            value={value}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={2}>
          <DeleteOutlined
            className="delete-button"
            onClick={() => deleteSlider(index)}
          />
        </Grid>
      </>
    ),
    [deleteSlider, onSliderChange]
  );

  return (
    <>
      <Button variant="contained" onClick={addSlider}>
        Add slider
      </Button>
      <Grid container spacing={2}>
        {sliders.map(toSlider)}
      </Grid>
    </>
  );
}

export default App;
