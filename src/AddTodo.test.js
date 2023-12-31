import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});





 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("MM/DD/YYYY");
  const element = screen.getByRole("button", {name: /Add/i});
  const due1 = "06/30/2023";
  const due2 = "06/29/2023";
  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: due1}});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target: {value: "History Test"}});
  fireEvent.change(inputDate, {target: {value: due2}});
  fireEvent.click(element);
  const check1 = screen.getByText(/History Test/i);
  const check2 = screen.getByText(new RegExp(due1, "i"));
  expect(check1).toBeInTheDocument();
  expect(check2).not.toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
