// @vitest-environment jsdom

import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import TextInput from './TextInput'


describe(TextInput, () => {
    it('Should display the helper text', () => {
        const { getByText, unmount } = render(
            <TextInput 
                error={false} 
                helperText={'text'} 
                errorText=''
                value={'123'} 
                callback={() => {}}        
            />
        );

        const element = getByText(/text/i);
        expect(element).toBeDefined();
        unmount();
    });
    it('Should display the value', () => {
        const { getByDisplayValue, unmount } = render(
            <TextInput 
                error={false} 
                helperText={'text'} 
                errorText=''
                value={'123'} 
                callback={() => {}}        
            />
        );

        const element = getByDisplayValue(/123/i);
        expect(element).toBeDefined();
        unmount();
    });
    it('Should display the error label when an error is set', () => {
        const { getByLabelText, unmount } = render(
            <TextInput 
                error={true} 
                helperText={'text'} 
                errorText={'error'} 
                value={'123'} 
                callback={() => {}}        
            />
        );

        const element = getByLabelText(/error/i);
        expect(element).toBeDefined();
        unmount();
    });

    it('Should not display the error label when an error is unset', () => {
        const { queryByLabelText, unmount } = render(
            <TextInput
                error={false}
                helperText={'text'}
                errorText={'meh'}
                value={'123'}
                callback={() => {}}
            />
        );

        const element = queryByLabelText(/error/i);
        expect(element).toBeNull();
        unmount();
    });
    it('Should trigger callback on value change', () => {
        const cb = vi.fn(() => {});
        const { getByTestId, unmount } = render(
            <TextInput 
                error={false}
                helperText={'text'}
                errorText=''
                value={'123'}
                callback={cb}
            />
        );

        const element = getByTestId('input-field').querySelector('input') as HTMLInputElement;
        expect(element).toBeDefined();
        fireEvent.change(element, {target: {value: '1234'}});
        expect(cb).toHaveBeenCalled();
        unmount();
    });
})