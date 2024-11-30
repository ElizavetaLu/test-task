import { Box, List, ListItem, Typography } from '@mui/material';

export default function Backend() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>
        Create ASP.NET Core 6/7 application. You don't need creating UI!
      </Typography>
      <Typography>
        Your application has to use code one of the databases: MsSQL, MySQL,
        PostgreSQL (preferred). You have to use code first migration.
      </Typography>
      <Typography>
        The database model has to be designed for storing the following
        information:
      </Typography>
      <List>
        <ListItem sx={{ p: 0, ml: 4 }}>
          1. Nodes of in-depended trees. Every node must belong to a single
          tree. All children nodes must belong to the same tree as their parent
          node. Every node has a single obligatory field. It is the name.
          Everything else is optional. If you need anything for designing
          in-depended trees you can add it as you want.
        </ListItem>
        <ListItem sx={{ p: 0, ml: 4 }}>
          2. The journal of all exceptions during processing Rest API requests.
          Every journal record must keep information about: the unique event ID,
          the timestamp when the event happened, all query and body parameters,
          and the stack trace of an exception.
        </ListItem>
      </List>
      <Typography>
        Your application should provide Rest API similar (ideally the same) to
        the existing (check swagger).
      </Typography>
      <Typography>
        Your application should have its own "SecureException" exception class.
        If during the request processing SecureException or its child exception
        was thrown, all information about the exception should be stored in the
        journal and your application should return a response with HTTP status =
        500. The response should look like this:
      </Typography>
      <Typography>{`{"type": "name of exception", "id": "id of event", "data": {"message": "message of exception"}}`}</Typography>
      <Typography>Example:</Typography>
      <Typography>{`{"type": "Secure", "id": "638136064526554554", "data": {"message": "You have to delete all children nodes first"}}`}</Typography>
      <Typography>
        The full information about all other exception types should be stored in
        the journal. The only difference is that the response for other
        exception types should look like:
      </Typography>
      <Typography>{`{"type": "Exception", "id": "id of event", "data": {"message": "Internal server error ID = id of event"}}`}</Typography>
      <Typography>Example:</Typography>
      <Typography>{`{"type": "Exception", "id": "638136064187111634", "data": {"message": "Internal server error ID = 638136064187111634"}}`}</Typography>
    </Box>
  );
}
