package com.edu.cibertec.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.cibertec.modelo.Producto;
import com.edu.cibertec.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService{

	@Autowired
	private ProductoRepository productoRepository;
	
	@Override
	public List<Producto> obtenerTodos() {
		// TODO Auto-generated method stub
		return productoRepository.findAll();
	}

	@Override
	public void guardar(Producto o) {
		productoRepository.save(o);
	}

	@Override
	public Producto getProductoById(int id) {
		Optional<Producto> optional = productoRepository.findById(id);
		Producto o = null;
		if(optional.isPresent())
			o = optional.get();
		return o;
	}

	@Override
	public void eliminarProductoById(int id) {
		productoRepository.deleteById(id);		
	}

}
