import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 900px;
  width: 100%;
  height: 80%;
`;

const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px;
`;

const StyledDatagrid = styled(DataGrid)`
  width: 100%;
`;

const ActionCellContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;

export {
  Container,
  TableWrapper,
  TableHeader,
  StyledDatagrid,
  ActionCellContainer,
  DialogContent,
}
