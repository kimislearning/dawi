package com.edu.cibertec.service;

import java.util.List;

import com.edu.cibertec.modelo.Producto;

public interface ProductoService {
	//matricular la cabecera de los metodos que se van a utilizar
	//Listar todos
	List<Producto> obtenerTodos();
	void guardar(Producto o);
	Producto getProductoById(int id);
	void eliminarProductoById(int id);
}
