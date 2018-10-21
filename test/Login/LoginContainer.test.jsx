import React from 'react';
import { styledComponent as LoginContainer } from '../../src/components/Login/LoginContainer';

describe('LoginContainer', () => {
  test('Exibe painel de erros com a quantidade correta de mensagens de erro', async () => {
    // arrange
    const errors = ['Mensagem de erro 01', 'Mensagem de erro 02'];

    // act
    const wrapper = mount(<LoginContainer signIn={() => {}} clearAuthErrors={() => {}} errors={errors} />);

    // assert error panel exists
    const errorPanel = wrapper.find('.is-danger');
    expect(errorPanel.exists()).toEqual(true);

    // asser it displays the provided error list
    const errorList = wrapper.find('.is-danger ul li');
    expect(errorList.length).toBe(errors.length);
  });
});
