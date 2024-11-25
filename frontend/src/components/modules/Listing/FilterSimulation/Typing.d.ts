export type FilterSimulationProps = {
  filterValue: Filter;
  setFilterValue: (newFilter: Filter) => void;
};

type Filter = {
  name: string;
  email: string;
  code: string;
};
