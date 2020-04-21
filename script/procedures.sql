drop PACKAGE produto_package;

CREATE OR REPLACE PACKAGE produto_package AS
  PROCEDURE atualizar_produtos(val_percentual DECIMAL);
  PROCEDURE atualizar_valor_produto(val_percentual DECIMAL, produto_id NUMBER);
END produto_package;
/
CREATE OR REPLACE PACKAGE BODY produto_package IS
   PROCEDURE atualizar_produtos(val_percentual DECIMAL) IS 
   BEGIN 
    FOR i IN (SELECT id, valor FROM produto) LOOP
        UPDATE produto set valor = ((i.valor + (i.valor * val_percentual)/100)) where id = i.id;
     END LOOP;
      commit;
   END atualizar_produtos;
   PROCEDURE atualizar_valor_produto(val_percentual DECIMAL, produto_id NUMBER) IS 
      var_valor_percentual_calculado DECIMAL;
      var_valor_percentual_existente DECIMAL;
      var_count NUMBER;
   BEGIN 
      SELECT COUNT(*) INTO var_count FROM produto;
      IF  var_count > 0 THEN
          SELECT valor INTO var_valor_percentual_existente FROM produto WHERE id = produto_id; 
          var_valor_percentual_calculado := var_valor_percentual_existente + ((var_valor_percentual_existente * val_percentual) / 100);
          update produto set valor = var_valor_percentual_calculado where id = produto_id;
          commit;
      END IF;
  EXCEPTION WHEN NO_DATA_FOUND THEN
    DBMS_OUTPUT.put_line('Não existe registro pro id informado');
   END atualizar_valor_produto;
END produto_package;