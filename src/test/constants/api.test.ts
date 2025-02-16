import { describe, it, expect } from 'vitest';
import { API_URL, API_KEY, PRODUCTION_URL, supabase } from '../../constants/api';

describe('API Constants', () => {
    it('debería tener una API_URL válida', () => {
        expect(API_URL).toBeDefined();
        expect(API_URL).toMatch(/^https?:\/\//);
    });

    it('debería tener una API_KEY válida', () => {
        expect(API_KEY).toBeDefined();
        expect(API_KEY).toHaveLength(32); 
    });

    it('debería tener una PRODUCTION_URL válida', () => {
        expect(PRODUCTION_URL).toBeDefined();
        expect(PRODUCTION_URL).toMatch(/^https?:\/\//);
    });
});

describe('Supabase Client', () => {
    it('debería crear un cliente de supabase con URL y clave válidas', () => {
        expect(supabase).toBeDefined();
        expect(supabase.auth).toBeDefined();
    });
});
