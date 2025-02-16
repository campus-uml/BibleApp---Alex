import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import Register from '../../components/login/Register';
import useLogin from '@/Hooks/useLogin';

vi.mock('../../Hooks/useLogin', () => ({
    default: vi.fn(() => ({
        signUpNewUser: vi.fn(),
        loading: false,
    })),
}));

describe('Componente de Registro', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza el formulario de registro', () => {
        render(<Register />);
        expect(screen.getByText('BibleApp')).toBeInTheDocument();
        expect(screen.getByText('Crea tu cuenta para comenzar')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirmar Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Regístrate' })).toBeInTheDocument();
    });

    it('muestra error cuando las contraseñas no coinciden', async () => {
        render(<Register />);
        
        fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password456' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

        await waitFor(() => {
            expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
        });
    });

    it('muestra error cuando no se proporciona el nombre completo', async () => {
        render(<Register />);
        
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

        await waitFor(() => {
            expect(screen.getByText('El nombre completo es obligatorio')).toBeInTheDocument();
        });
    });

    it('llama a signUpNewUser con los datos correctos cuando se envía el formulario', async () => {
        const mockSignUpNewUser = vi.fn().mockResolvedValue({ success: true, message: 'Registro exitoso' });
        (useLogin as Mock).mockReturnValue({
            signUpNewUser: mockSignUpNewUser,
            loading: false,
        });

        render(<Register />);
        
        fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

        await waitFor(() => {
            expect(mockSignUpNewUser).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
        });
    });

    it('muestra mensaje de éxito cuando el registro es exitoso', async () => {
        const mockSignUpNewUser = vi.fn().mockResolvedValue({ success: true, message: 'Registro exitoso' });
        (useLogin as Mock).mockReturnValue({
            signUpNewUser: mockSignUpNewUser,
            loading: false,
        });

        render(<Register />);
        
        fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

        await waitFor(() => {
            expect(screen.getByText('Éxito')).toBeInTheDocument();
            expect(screen.getByText('Registro exitoso')).toBeInTheDocument();
        });
    });

    it('muestra mensaje de error cuando el registro falla', async () => {
        const mockSignUpNewUser = vi.fn().mockResolvedValue({ success: false, message: 'Registro fallido' });
        (useLogin as Mock).mockReturnValue({
            signUpNewUser: mockSignUpNewUser,
            loading: false,
        });

        render(<Register />);
        
        fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: 'Regístrate' }));

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
            expect(screen.getByText('Registro fallido')).toBeInTheDocument();
        });
    });

    it('deshabilita el botón de envío cuando está cargando', () => {
        (useLogin as Mock).mockReturnValue({
            signUpNewUser: vi.fn(),
            loading: true,
        });

        render(<Register />);
        
        expect(screen.getByRole('button', { name: 'Registrando...' })).toBeDisabled();
    });
});