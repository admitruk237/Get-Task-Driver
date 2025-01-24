import AddItemForm from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'AddItemForm',
  component: AddItemForm,
};

const callBack = action('Button add was pressed inside the form');

export const AddItemFormExample = (props: any) => (
  <AddItemForm addItem={callBack} />
);
