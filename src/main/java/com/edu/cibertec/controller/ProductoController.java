package com.edu.cibertec.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.edu.cibertec.modelo.Producto;
import com.edu.cibertec.service.ProductoService;

@Controller
public class ProductoController {

	@Autowired
	private ProductoService productoService;
	
	// Modificación en el código
	
	@GetMapping("/productos")
	public String index(Model modelo) {
		modelo.addAttribute("productos", productoService.obtenerTodos());
		//nombre de la vista
		return "productos";
	}
	
	@GetMapping("/nuevoProductoForm")
	public String nuevoProductoForm(Model modelo) {
		Producto o = new Producto();
		modelo.addAttribute("producto", o);
		return "nuevo_producto";
	}
	
	@PostMapping("/guardarProducto")
	public String guardarProducto(@RequestBody Producto o) {
		productoService.guardar(o);
		//modelo.addAttribute("productos", productoService.obtenerTodos());
		return "redirect:/productos";
	}
	
	@PutMapping("/mostrarFormEdit")
	public String mostrarFormEdit(@ModelAttribute("producto") Producto o) {
		productoService.guardar(o);
		return "redirect:/";
	}
	
	@GetMapping("/eliminarProducto")
	public String eliminarProducto(@RequestParam("id") int id) {
		productoService.eliminarProductoById(id);
		return "redirect:/productos";
	}
}
