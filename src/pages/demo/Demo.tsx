import { useContext } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { DemoContext, DepoProvider } from '../../context/DemoContext';
import { ModalContext } from '../../context/ModalContext';
import { useToggle } from '../../hooks/useToggle';
import { ITreeNode, EModal } from '../../types';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function Demo() {
  const list = [{ id: 1, name: 'Root', children: [] }];

  return (
    <DepoProvider>
      <CustomTree data={list} />
    </DepoProvider>
  );
}

const CustomTree = ({ data }: { data: ITreeNode[] }) => {
  return (
    <List sx={{ p: 0, cursor: 'pointer' }}>
      {data.map((item, i) => (
        <TreeNode key={i} node={item} />
      ))}
    </List>
  );
};

const TreeNode = ({ node }: { node: ITreeNode }) => {
  const { handleModal } = useContext(ModalContext);
  const { nodeId, setNodeId } = useContext(DemoContext);

  const [expanded, toggle] = useToggle();

  const onExpand = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    setNodeId(node.id);
    toggle();
  };

  const onEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    modal: EModal,
    modal_props?: string,
  ) => {
    e.stopPropagation();
    handleModal(modal, modal_props);
  };

  const isRoot = node.name === 'Root';

  return (
    <ListItem
      onClick={onExpand}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: node.id === 1 ? 0 : '0 15px',
      }}
    >
      <Box display="flex" alignItems="center">
        {!!node?.children?.length &&
          (expanded ? <ExpandLess /> : <ExpandMore />)}

        <Box display="flex" alignItems="center">
          <Typography component="span" mr={1.5}>
            {node?.name}
          </Typography>

          {nodeId === node.id && (
            <>
              <IconButton
                onClick={(e) => onEdit(e, EModal.CREATE_NODE)}
                sx={{ p: 0 }}
              >
                <AddCircleOutlineRoundedIcon color="primary" />
              </IconButton>

              {!isRoot && (
                <>
                  <IconButton
                    onClick={(e) => onEdit(e, EModal.REMANE_NODE)}
                    sx={{ p: 0 }}
                  >
                    <EditOutlinedIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => onEdit(e, EModal.DELETE_NODE, node.name)}
                    sx={{ p: 0 }}
                  >
                    <DeleteOutlineOutlinedIcon color="error" />
                  </IconButton>
                </>
              )}
            </>
          )}
        </Box>
      </Box>

      <Collapse in={node?.children && expanded}>
        <CustomTree data={node.children} />
      </Collapse>
    </ListItem>
  );
};
