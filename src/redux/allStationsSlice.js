import { createSlice } from '@reduxjs/toolkit';
// wheat is create slice? https://redux-toolkit.js.org/api/createSlice 

function parseStationData(initData) {
  /**
   * TODO code for parsing database query goes here
   */
  return initData
}

const initialState = {
  stations: [],
  hightlightedStationData: []
}

export const allStationsSlice = createSlice({
  name: 'allStations',
  initialState,
  reducers: {
    clearStationData: state => {
      state.stations = initialState.stations;
    },
    setStationData: (state, action) => {
      state.stations = parseStationData(action.payload);
    },
  },
});

export const { clearStationData, setStationData } = allStationsSlice.actions;

// for testing
const fakeLat = ()=> Math.random()*15+5; 
const fakeLon = ()=> Math.random()*40-5; 
const numFakes = 10
const fakeStations = []
const genNeighborData = (key) => ({
  key: key,
  name: fakeStations[key].name,
  gps: fakeStations[key].gps,
  weight: Math.floor(Math.random()*10+1),
})
for(var i = 1; i <= numFakes; i++) {
  const classification = Math.random()

  let neighbors = false;
  if (i > 3) {
    const neightbor1Id = Math.max(0,Math.floor(Math.random()*i-1));
    const neightbor2Id = Math.max(0,Math.floor(Math.random()*i-1))
    console.log({i,neightbor1Id, neightbor2Id, fakeStations})
    neighbors = [genNeighborData(neightbor1Id)]
    if (neightbor1Id !== neightbor2Id) {
      neighbors.push(genNeighborData(neightbor2Id))
    }
  }

  const station = {
    classification,
    neighbors: neighbors || [],
    key: i,
    name: `Example ${i}`,
    gps: [fakeLat(), fakeLon()],
    isFlagged: Math.random() > 0.8,
  };
  fakeStations.push(station)
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getStationsData = amount => dispatch => {
  setTimeout(() => {
    console.log('stations set', fakeStations)
    dispatch(setStationData(fakeStations)); // amount
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllStations = state => state.allStations.stations;

export default allStationsSlice.reducer;
