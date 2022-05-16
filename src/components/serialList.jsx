
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export default function SerialList() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    return (
        <List dense={dense}>
        {generate(
            <ListItem>
            <ListItemText
                primary="Single-line item"
                secondary={secondary ? 'Secondary text' : null}
            />
            </ListItem>,
        )}
        </List>
    );
}