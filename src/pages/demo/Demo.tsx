import { useContext, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { DemoContext, ModalContext, TModalProps } from '../../context';
import { DepoProvider } from '../../context/DemoContext';
import { useToggle } from '../../hooks/useToggle';
import { useQuery } from '@tanstack/react-query';
import { ITreeNode, EModal } from '../../types';
import { getTree } from '../../services';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Demo() {
  const [list, setList] = useState<ITreeNode[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['tree'],
    queryFn: getTree,
  });

  useEffect(() => {
    if (isLoading) return;
    if (data) {
      const modif_data = [{ ...data, name: 'Root' }];
      setList(modif_data);
    }
  }, [isLoading, data]);

  return (
    <DepoProvider>
      {isLoading ? <CircularProgress size={20} /> : <CustomTree data={list} />}
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

  // use Demo Context to prevent multiple props passing
  const { nodeId, setNodeId } = useContext(DemoContext);

  const [expanded, toggle] = useToggle();

  const onExpand = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();

    setNodeId(node.id);

    if (!node?.children?.length) return;

    toggle();
  };

  const onEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    modal: EModal,
    modal_props?: TModalProps,
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
        padding: isRoot ? 0 : '0 15px',
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
                onClick={(e) =>
                  onEdit(e, EModal.CREATE_NODE, {
                    parentNodeId: node.id,
                  })
                }
                sx={{ p: 0 }}
              >
                <AddCircleOutlineRoundedIcon color="primary" />
              </IconButton>

              {!isRoot && (
                <>
                  <IconButton
                    onClick={(e) =>
                      onEdit(e, EModal.REMANE_NODE, {
                        nodeId: node.id,
                        nodeName: node.name,
                      })
                    }
                    sx={{ p: 0 }}
                  >
                    <EditOutlinedIcon color="primary" />
                  </IconButton>

                  <IconButton
                    onClick={(e) =>
                      onEdit(e, EModal.DELETE_NODE, {
                        nodeId: node.id,
                        nodeName: node.name,
                      })
                    }
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
