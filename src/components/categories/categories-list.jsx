import { List, ListItem, Typography, ListItemIcon,ListItemText } from "@material-ui/core";
import { MdFolder } from "react-icons/md";

export default function ListCategories({ categories, onItemClick }) {
  return (
    <List >
      {categories.map((element) => (
        <ListItem button onClick={() => onItemClick(element.id)}>
          <ListItemIcon>
            <MdFolder />
          </ListItemIcon>
          <ListItemText
            primary={element.title}
            secondary={
              element?.todos
                ? element?.todos.length + "Todos in this list"
                : "0 Todos in this list"
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
