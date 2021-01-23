import React, { Fragment } from "react";
import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

import { makeStyles } from '@material-ui/core/styles'

import "quill-handlebars/dist/quill.handlebars.css";

import "quill-handlebars";

export const PostList = (props) => (
  <List bulkActionButtons={false} exporter={false} {...props}>
    <Datagrid>
      <TextField source="title" />
    </Datagrid>
  </List>
);

const atValues = [
  { id: 1, value: "Fredrik Sundqvist" },
  { id: 2, value: "Patrik Sjölin" },
  { id: 1, value: "Adil Malik" },
  { id: 2, value: "Hunter" },
  { id: 1, value: "Conner" },
  { id: 2, value: "Elizabeth" },

];
const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];

export const PostCreate = (props) => {
  const useStyles = makeStyles({
    createPost:{ '& div': {overflow: 'visible !important' }}
});

const classes = useStyles();

  return (
    <Fragment>
      <Create className={classes.createPost} {...props}>
        <SimpleForm >
          <TextInput source="title" />
          <RichTextInput
            source="body"
            options={{
              modules:{
              handlebars: {
                allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
                handlebarsDenotationChars: ["{{"],
                source: function (searchTerm, renderList, handlebarsChar) {
                  let values;
  
                  if (handlebarsChar === "{{") {
                    values = atValues;
                  } else {
                    values = hashValues;
                  }
  
                  if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                  } else {
                    const matches = [];
                    for (let i = 0; i < values.length; i++)
                      if (
                        ~values[i].value
                          .toLowerCase()
                          .indexOf(searchTerm.toLowerCase())
                      )
                        matches.push(values[i]);
                    renderList(matches, searchTerm);
                  }
                },
              },
            }
            }}
          />
        </SimpleForm>
      </Create>
    </Fragment>
  );
}
