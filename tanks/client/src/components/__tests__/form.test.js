import { screen } from "@testing-library/react";
import { Form } from '../index'
import { renderWithProviders } from "../../utils/utils-for-tests";


describe('Form component', () => {
    it("renders learn react link", () => {
        renderWithProviders(<Form />);
    });
})